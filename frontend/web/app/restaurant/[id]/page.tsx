import RestaurantDetail from "@/components/pages/restaurant-detail"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return <RestaurantDetail restaurantId={params.id} />
}
