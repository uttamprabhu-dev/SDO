import { Outlet, Link, useLocation } from 'react-router';
import { getAllRoutes } from './router-utils';

export default function AppLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationRoutes: { path: string; label: string }[] = getAllRoutes()
    .filter(
      route =>
        route.handle?.showInNavigation === true &&
        route.fullPath !== undefined &&
        route.handle?.label !== undefined
    )
    .map(
      route =>
        ({
          path: route.fullPath,
          label: route.handle?.label,
        }) as { path: string; label: string }
    );

  return (
    <>
      <nav className="bg-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Absyz <span className="text-blue-400 font-normal text-sm">Pvt Ltd</span>
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navigationRoutes.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-blue-400 transition-all duration-300 ${
                      isActive(item.path) ? 'w-4/5' : 'w-0'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
