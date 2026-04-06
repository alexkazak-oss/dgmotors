import { CarCard } from './CarCard'

interface CatalogGridProps {
  cars: React.ComponentProps<typeof CarCard>['car'][]
  emptyMessage?: string
}

export function CatalogGrid({ cars, emptyMessage = 'Автомобили не найдены' }: CatalogGridProps) {
  if (cars.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-neutral-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
