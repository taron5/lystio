import {
  HomeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-red-500 block">Property in Austria</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover apartments, houses, and offices with our advanced search
              powered by AI. Search by location, filter by your preferences, and
              find verified listings.
            </p>
            <div className="text-lg text-gray-500">
              Use the search bar above to get started
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Lystio?
            </h2>
            <p className="text-lg text-gray-600">
              Advanced search technology meets verified property listings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Location Search
              </h3>
              <p className="text-gray-600">
                Powered by Mapbox with intelligent address autocomplete and
                boundary search
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Recommendations
              </h3>
              <p className="text-gray-600">
                Get personalized property suggestions with our Lystio AI
                technology
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Listings
              </h3>
              <p className="text-gray-600">
                All properties are verified for accuracy and authenticity
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BuildingOfficeIcon className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                All Property Types
              </h3>
              <p className="text-gray-600">
                Apartments, houses, offices, and more - find exactly what you
                need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Next Property?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your search now with our intelligent property finder
          </p>
          <div className="text-gray-500">
            Click on the search bar above to begin exploring properties in
            Austria
          </div>
        </div>
      </section>
    </div>
  );
}
