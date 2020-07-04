export interface ResultsTMDb {
    page: number;
    total_results: number;
    total_pages: number;
    results: Movie[];
}

export interface Movie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface TVShow {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date?: string;
    origin_country?: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name?: string;
    original_name?: string;
}

export interface Billboard {
    poster_path: string;
    id: number;
}

export interface ActorDetails {
    birthday?: string;
    known_for_department?: string;
    deathday?: any;
    id?: number;
    name?: string;
    also_known_as?: string[];
    gender?: number;
    biography?: string;
    popularity?: number;
    place_of_birth?: string;
    profile_path?: string;
    adult?: boolean;
    imdb_id?: string;
    homepage?: any;
}

export interface MovieDetails {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: any;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Productioncompany[];
    production_countries?: Productioncountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: Spokenlanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface TVShowDetails {
    backdrop_path?: string;
    created_by?: Createdby[];
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: Lastepisodetoair;
    name?: string;
    next_episode_to_air?: any;
    networks?: Network[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Productioncompany[];
    seasons?: Season[];
    status?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface PersonCredits {
    cast: Cast[];
    crew: Crew[];
    id: number;
}

interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface Productioncompany {
    name: string;
    id: number;
    logo_path?: string;
    origin_country: string;
}

interface Network {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
}

interface Lastepisodetoair {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

interface Createdby {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}


interface Spokenlanguage {
    iso_639_1: string;
    name: string;
}

interface Productioncountry {
    iso_3166_1: string;
    name: string;
}

interface Productioncompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
}

export interface ResultGenres {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}


export interface CreditsResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
}

export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
}

//JUSTWATCH API
export interface ResultsJW {
    page: number;
    page_size: number;
    total_pages: number;
    total_results: number;
    items: MovieJW[];
}

export interface MovieJW {
    jw_entity_id: string;
    id: number;
    title: string;
    full_path: string;
    full_paths: Fullpaths;
    poster: string;
    original_release_year: number;
    tmdb_popularity: number;
    object_type: string;
    offers: Offer[];
    scoring: Scoring[];
}

interface Scoring {
    provider_type: string;
    value: number;
}

export interface Offer {
    monetization_type: string;
    provider_id: number;
    retail_price?: number;
    last_change_retail_price?: number;
    last_change_difference?: number;
    last_change_percent?: number;
    last_change_date?: string;
    last_change_date_provider_id?: string;
    original_retail_price?: number;
    currency: string;
    original_currency?: string;
    urls: Urls;
    presentation_type: string;
}

interface Urls {
    standard_web: string;
    deeplink_android_tv?: string;
    deeplink_fire_tv?: string;
    deeplink_tvos?: string;
}

interface Fullpaths {
    MOVIE_DETAIL_OVERVIEW: string;
}

export interface Provider {
    id: number;
    clear_name: string;
    color: string;
}


export interface ProviderJW {
    id: number;
    technical_name: string;
    short_name: string;
    clear_name: string;
    priority: number;
    display_priority: number;
    monetization_types: string[];
    icon_url: string;
    slug: string;
    data: Data;
}

interface Data {
    deeplink_data: (Deeplinkdatum | Deeplinkdata2 | Deeplinkdata3)[];
    packages: Packages;
}

interface Packages {
    android_tv: string;
    fire_tv: string;
    tvos: string;
}

interface Deeplinkdata3 {
    scheme: string;
    packages: string[];
    platforms: string[];
    path_template: string;
    extras: Extras;
}

interface Extras {
    'S.source': string;
}

interface Deeplinkdata2 {
    scheme: string;
    packages: string[];
    platforms: string[];
    path_template: string;
    extras?: Extra;
}

interface Extra {
    'S.com.amazon.ignition.DeepLinkIntent.DEEP_LINK': string;
}

interface Deeplinkdatum {
    scheme: string;
    packages: string[];
    platforms: string[];
    path_template: string;
    extras?: any;
}

export interface MovieJWDetails {
    jw_entity_id: string;
    id: number;
    title: string;
    poster: string;
    short_description: string;
    original_release_year: number;
    tmdb_popularity: number;
    object_type: string;
    original_title: string;
    scoring: Scoring[];
    credits: Credit[];
    external_ids: Externalid[];
    genre_ids: number[];
    runtime: number;
}

interface Externalid {
    provider: string;
    external_id: string;
}

interface Credit {
    role: string;
    character_name?: string;
    person_id: number;
    name: string;
}

interface Scoring {
    provider_type: string;
    value: number;
}

export interface TVShowJWDetails {
    jw_entity_id: string;
    id: number;
    title: string;
    original_release_year: number;
    tmdb_popularity: number;
    object_type: string;
    original_title: string;
    scoring: Scoring[];
    external_ids: Externalid[];
    genre_ids: number[];
}
