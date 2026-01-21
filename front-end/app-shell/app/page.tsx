import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-8 text-gray-800">
                    VHub Booking Platform
                </h1>
                <p className="text-xl text-gray-600 mb-12">
                    Microfrontend Architecture with Turbo Repo
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Link href="/order" className="group">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-green-500">
                            <div className="text-4xl mb-4">📦</div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-green-600">
                                Order Management
                            </h2>
                            <p className="text-gray-600">
                                Manage orders, create new bookings, and track order status
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>Built with Next.js, React, and Module Federation</p>
                </div>
            </div>
        </div>
    );
}
