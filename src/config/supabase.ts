import { createClient } from "@supabase/supabase-js";
//tem que instalar com npm install esse comando acima

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;
//process.env = acessar .env e pega o valor lá
//  o ! garante que o valor existe lá

const supabase = createClient(
    supabaseUrl,
    supabaseSecretKey,
);

export default supabase;