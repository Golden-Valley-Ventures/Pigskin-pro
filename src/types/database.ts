/**
 * Supabase generated types — pigskin-cms
 *
 * In a real project you would generate this file with:
 *   supabase gen types typescript --local > src/types/database.ts
 *
 * This hand-written equivalent matches what that command produces for the
 * schema in supabase/migrations/. Regenerate after every migration.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ContentStatus = 'draft' | 'published' | 'archived';
export type ConferenceName = 'AFC' | 'NFC';
export type DivisionRegion = 'East' | 'West' | 'North' | 'South';
export type SourceTier =
  | 'tier_1_primary'
  | 'tier_2_reputable'
  | 'tier_3_aggregator'
  | 'tier_4_social';
export type ResidualStatus = 'open' | 'in_progress' | 'resolved' | 'wont_fix';
export type ResidualPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: { user_id: string; email: string; created_at: string };
        Insert: { user_id: string; email: string; created_at?: string };
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
      divisions: {
        Row: {
          id: string;
          conference: ConferenceName;
          region: DivisionRegion;
          slug: string;
          name: string;
          summary: string | null;
          season: number;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['divisions']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['divisions']['Insert']>;
      };
      teams: {
        Row: {
          id: string;
          division_id: string;
          slug: string;
          name: string;
          short_name: string;
          abbreviation: string;
          city: string;
          primary_color: string | null;
          secondary_color: string | null;
          logo_url: string | null;
          season: number;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['teams']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['teams']['Insert']>;
      };
      team_snapshots: {
        Row: {
          id: string;
          team_id: string;
          as_of_date: string;
          team_thesis: string | null;
          qb_summary: string | null;
          ol_grade: string | null;
          ol_summary: string | null;
          coaching_summary: string | null;
          defensive_summary: string | null;
          injury_status: string | null;
          fantasy_notes: string | null;
          betting_notes: string | null;
          key_additions: string | null;
          key_losses: string | null;
          archetype: string | null;
          season: number;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['team_snapshots']['Row'],
          'id' | 'created_at' | 'updated_at' | 'as_of_date'
        > & {
          id?: string;
          as_of_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database['public']['Tables']['team_snapshots']['Insert']
        >;
      };
      projections: {
        Row: {
          id: string;
          team_id: string;
          as_of_date: string;
          projected_wins: number | null;
          floor_wins: number | null;
          ceiling_wins: number | null;
          confidence: number | null;
          playoff_probability: number | null;
          division_probability: number | null;
          notes: string | null;
          season: number;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['projections']['Row'],
          'id' | 'created_at' | 'updated_at' | 'as_of_date'
        > & {
          id?: string;
          as_of_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projections']['Insert']>;
      };
      residuals: {
        Row: {
          id: string;
          team_id: string;
          item: string;
          status: ResidualStatus;
          priority: ResidualPriority;
          notes: string | null;
          resolved_at: string | null;
          season: number;
          content_status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['residuals']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['residuals']['Insert']>;
      };
      source_notes: {
        Row: {
          id: string;
          team_id: string;
          source_name: string;
          url: string | null;
          source_date: string | null;
          tier: SourceTier;
          confidence: number;
          excerpt: string | null;
          claim_supported: string;
          season: number;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
          last_edited_by: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['source_notes']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['source_notes']['Insert']>;
      };
      audit_log: {
        Row: {
          id: number;
          table_name: string;
          row_id: string;
          action: 'insert' | 'update' | 'delete';
          actor: string | null;
          diff: Json | null;
          occurred_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['audit_log']['Row'],
          'id' | 'occurred_at'
        > & {
          id?: number;
          occurred_at?: string;
        };
        Update: never;
      };
    };
    Views: {
      team_latest_snapshot: {
        Row: Database['public']['Tables']['team_snapshots']['Row'];
      };
      team_latest_projection: {
        Row: Database['public']['Tables']['projections']['Row'];
      };
    };
    Enums: {
      content_status: ContentStatus;
      conference_name: ConferenceName;
      division_region: DivisionRegion;
      source_tier: SourceTier;
      residual_status: ResidualStatus;
      residual_priority: ResidualPriority;
    };
  };
}

// Convenience exports
export type Team = Database['public']['Tables']['teams']['Row'];
export type TeamSnapshot = Database['public']['Tables']['team_snapshots']['Row'];
export type Projection = Database['public']['Tables']['projections']['Row'];
export type Residual = Database['public']['Tables']['residuals']['Row'];
export type SourceNote = Database['public']['Tables']['source_notes']['Row'];
export type Division = Database['public']['Tables']['divisions']['Row'];
export type AuditLogEntry = Database['public']['Tables']['audit_log']['Row'];
