import { IApi, IRoute } from '@umijs/types';

export default function(api: IApi) {
  api.logger.info('use plugin route-reslove');

  api.modifyRoutes(routes => {
    const patchRouters = (routes: IRoute[] = []) => {
      if (routes && routes.length > 0) {
        routes.forEach(route => {
          if (route.component) {
            const index = route.component.indexOf('@sensoro/');
            if (index > -1) {
              route.component = route.component.slice(index);
            }
          }
          patchRouters(route.routes);
        });
      }
    };
    patchRouters(routes);
    return routes;
  });
}
