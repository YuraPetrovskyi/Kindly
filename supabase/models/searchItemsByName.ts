import { item } from '../../types/supabaseTypes';
import newClient from '../utils/newClient';

export default async function searchItemsByName(
  searchTerm: string,
  limit: number,
  cursor: string
): Promise<item[]> {
  const supabase = newClient();

  try {
    let query = supabase
      .from('items')
      .select()
      .or(
        `item_name.ilike.%${searchTerm}%,item_type.ilike.%${searchTerm}%,item_subtype.ilike.%${searchTerm}%`
      )
      .order('created_at', { ascending: false })
      .limit(Number(limit));

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }
    return data ? (data as item[]) : [];
  } catch (error) {
    console.error(`Failed to get items from database: ${error}`);
    throw error;
  }
}
