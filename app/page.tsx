import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { yearsOfProduction, fuels } from "@/constants";
import { Hero, CarCard, SearchBar, ShowMore, CustomFilter } from "@/components";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    year: searchParams.year || 2024,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 6,
    model: searchParams.model || "",
    manufacturer: searchParams.manufacturer || "",
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars

  return (
    <main>
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Explore our <span className="text-primary-blue">wide range</span> of cars</h1>
          <p>Enter a <span className="text-primary-blue -mb-1">car brand</span> and <span className="text-primary-blue">car model</span> below</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore 
              pageNumber={(searchParams.limit || 6) / 6}
              isNext={(searchParams.limit || 6) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results. Please try another search.</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}