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
