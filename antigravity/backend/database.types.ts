export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    display_name: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    display_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    display_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            analysis_history: {
                Row: {
                    id: string
                    user_id: string
                    original_text: string
                    simplified_text: string
                    gravity_score: number
                    gravity_breakdown: Json
                    next_action: Json
                    created_at: string
                    tags: string[]
                }
                Insert: {
                    id?: string
                    user_id: string
                    original_text: string
                    simplified_text: string
                    gravity_score: number
                    gravity_breakdown: Json
                    next_action: Json
                    created_at?: string
                    tags?: string[]
                }
                Update: {
                    id?: string
                    user_id?: string
                    original_text?: string
                    simplified_text?: string
                    gravity_score?: number
                    gravity_breakdown?: Json
                    next_action?: Json
                    created_at?: string
                    tags?: string[]
                }
            }
            user_preferences: {
                Row: {
                    user_id: string
                    theme: string
                    simplification_level: string
                    auto_analyze: boolean
                    email_notifications: boolean
                    updated_at: string
                }
                Insert: {
                    user_id: string
                    theme?: string
                    simplification_level?: string
                    auto_analyze?: boolean
                    email_notifications?: boolean
                    updated_at?: string
                }
                Update: {
                    user_id?: string
                    theme?: string
                    simplification_level?: string
                    auto_analyze?: boolean
                    email_notifications?: boolean
                    updated_at?: string
                }
            }
        }
    }
}
