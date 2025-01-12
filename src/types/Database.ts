type Database = {
  public: {
    Tables: {
      your_table_name: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
  };
};
