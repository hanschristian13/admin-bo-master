import { getTransactionAgent } from '@/service/agent'
import { format, subDays } from 'date-fns';

const GetDetailTransaction = async (id: string, mode: string) => {
  if (typeof id === 'string' && mode === 'detail-agent') {
    const todayDate = Date.now();
    const yesterdayDate = subDays(todayDate, 1);

    const formattedToday = format(todayDate, 'yyyy-MM-dd');
    const formattedYesterday = format(yesterdayDate, 'yyyy-MM-dd');
    const params = {
      start_date: formattedYesterday,
      end_date: formattedToday,
      parent_id: 'levelind',
      dealer_id: id
    }

    const transactionAgent = await getTransactionAgent(params)
    return transactionAgent
  }
}

export default GetDetailTransaction
