import { getOrderDetails } from '@/actions'

import OrderConfirmationPage from './OrderConfirmationPage';

export default async function OrderConfirmation({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;
  const { order, items } = await getOrderDetails(parseInt(id))

  return <OrderConfirmationPage order={order} items={items} />
}
