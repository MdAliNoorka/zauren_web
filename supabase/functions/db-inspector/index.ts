// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Query to get all tables in public schema
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE')

    if (tablesError) {
      // Alternative query using rpc
      const { data: tablesAlt, error: rpcError } = await supabase.rpc('get_public_tables')
      
      if (rpcError) {
        // Direct SQL query as fallback
        const { data: rawTables, error: sqlError } = await supabase
          .from('pg_tables')
          .select('tablename')
          .eq('schemaname', 'public')

        if (sqlError) {
          throw new Error(`Could not fetch tables: ${sqlError.message}`)
        }
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            tables: rawTables?.map(t => t.tablename) || [],
            method: 'pg_tables'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          tables: tablesAlt || [],
          method: 'rpc'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
      )
    }

    // Check specific tables we're interested in
    const tableNames = tables?.map(t => t.table_name) || []
    const requiredTables = ['contact_submissions', 'chat_analytics', 'user_profiles', 'user_sessions']
    const existingTables = requiredTables.filter(table => tableNames.includes(table))
    const missingTables = requiredTables.filter(table => !tableNames.includes(table))

    // Try to get column info for existing tables
    const tableInfo = {}
    for (const tableName of existingTables) {
      try {
        const { data: columns } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_schema', 'public')
          .eq('table_name', tableName)
        
        tableInfo[tableName] = columns || []
      } catch (error) {
        tableInfo[tableName] = 'Error fetching columns'
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        allTables: tableNames,
        existingRequiredTables: existingTables,
        missingRequiredTables: missingTables,
        tableDetails: tableInfo,
        method: 'information_schema'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
    )

  } catch (error) {
    console.error('Database inspection error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to inspect database'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
