import { getMovie, getMovies } from "@/lib/api";
import { RouteId } from "@/lib/enums";
import type { LoaderFunctionProps, RouteItem } from "@/lib/types";

export function loaderNowPlaying({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.NOW_PAYING, page: params.page, filter: '' },);
}

export function loaderPopular({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.POPULAR, page: params.page, filter: '' },);
}

export function loaderTopRated({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.TOP_RATED, page: params.page, filter: '' },);
}

export function loaderUpcoming({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.UPCOMING, page: params.page, filter: '' },);
}

export function loaderOnDvD({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.ON_DVD, page: params.page, filter: '' },);
}

export function loaderSimilar({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.SIMILAR, page: params.page, filter: params.filter },);
}

export function loaderYear({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.FILTER_BY_YEAR, page: params.page, filter: params.filter },);
}

export function loaderKeyword({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.FILTER_BY_KEYWORD, page: params.page, filter: params.filter },);
}

export function loaderCast({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.FILTER_BY_CAST, page: params.page, filter: params.filter },);
}

export function loaderCrew({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.FILTER_BY_CREW, page: params.page, filter: params.filter },);
}

export function loaderMovieBiography({ params }: LoaderFunctionProps) {
  // return getMovie({ query: 'MOVIE', filter: params.filter });
  return getMovie({ query: 'ALL', filter: params.filter });
}

/**
 * Route navigation data object
 * Take note, the order of RouteItem array equals RouteId enum values
 */
export const routes: RouteItem[] = [
  {
    routeId: RouteId.NOW_PAYING,
    path: 'nowplaying/:page?',
    href: '/nowplaying',
    menuItem: 'Now Playing',
    header: 'Movies Now Playing',
    placement: 'SIDE_NAV',
    loader: loaderNowPlaying,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.POPULAR,
    path: ':page?',
    href: '/',
    menuItem: 'Popular',
    header: 'Popular Movies',
    placement: 'HEADER',
    loader: loaderPopular,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.TOP_RATED,
    path: 'toprated/:page?',
    href: '/toprated',
    menuItem: 'Top Rated',
    placement: 'HEADER',
    header: 'Top Rated Movies',
    loader: loaderTopRated,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.UPCOMING,
    path: 'upcoming/:page?',
    href: '/upcoming',
    menuItem: 'Upcoming',
    header: 'Upcoming Movies',
    placement: 'SIDE_NAV',
    loader: loaderUpcoming,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.ON_DVD,
    path: 'ondvd/:page?',
    href: '/ondvd',
    menuItem: 'On DVD',
    header: 'Movies On DVD',
    placement: 'HEADER',
    loader: loaderOnDvD,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.SIMILAR,
    path: 'similar/:filter/:title/:page?',
    href: '/similar',
    menuItem: 'Similar',
    header: 'Similar:',
    placement: 'NONE',
    loader: loaderSimilar,
    navBack: false,
    replaceHistory: true,
  },
  {
    routeId: RouteId.MOVIE_BIOGRAPHY,
    path: 'movie/:filter',
    href: '/movie',
    menuItem: 'Movie Biography',
    header: 'Movie Biography',
    placement: 'NONE',
    loader: loaderMovieBiography,
    navBack: true,
    replaceHistory: false,
  },
  {
    routeId: RouteId.FILTER_BY_YEAR,
    path: 'year/:filter/:page?',
    href: '/year',
    menuItem: '',
    header: 'Movies released',
    placement: 'NONE',
    loader: loaderYear,
    navBack: false,
    replaceHistory: false,
  },
  {
    routeId: RouteId.FILTER_BY_KEYWORD,
    path: 'keyword/:filter/:page?',
    href: '/keyword',
    menuItem: '',
    header: 'Keyword:',
    placement: 'NONE',
    loader: loaderKeyword,
    navBack: false,
    replaceHistory: false,
  },
  {
    routeId: RouteId.FILTER_BY_CAST,
    path: 'cast/:filter/:title/:page?',
    href: '/cast',
    menuItem: '',
    header: 'Cast:',
    placement: 'NONE',
    loader: loaderCast,
    navBack: false,
    replaceHistory: false,
  },
  {
    routeId: RouteId.FILTER_BY_CREW,
    path: 'crew/:filter/:title/:page?',
    href: '/crew',
    menuItem: '',
    header: 'Crew:',
    placement: 'NONE',
    loader: loaderCrew,
    navBack: false,
    replaceHistory: false,
  },
  {
    routeId: RouteId.ABOUT,
    path: 'about',
    href: '/about',
    menuItem: 'About',
    header: 'About',
    placement: 'SIDE_NAV_BOTTOM',
    loader: undefined,
    navBack: true,
    replaceHistory: false,
  },
]



