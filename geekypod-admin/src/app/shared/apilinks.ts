import { environment } from '../../environments/environment';

export class API_LINKS {
  public static LOGIN_URL: string = environment.baseURL + '/api/users/login';

  public static USER_URL: string = environment.baseURL + '/api/users';

  public static ABOUT_URL: string = environment.baseURL + '/api/about';

  public static DASHBOARD_URL: string = environment.baseURL + '/api/dashboard';

  public static SLIDER_URL: string = environment.baseURL + '/api/sliders';

  public static GENRE_URL: string = environment.baseURL + '/api/genres';

  public static PODCASTER_URL: string = environment.baseURL + '/api/podcasters';

  public static EPISODE_URL: string = environment.baseURL + '/api/episodes';

  public static CONTACT_URL: string = environment.baseURL + '/api/contact';

  public static SUBSCRIBER_URL: string =
    environment.baseURL + '/api/subscribers';
}
