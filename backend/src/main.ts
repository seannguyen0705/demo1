import { initApplication } from '@/app';
import { Env } from './utils/constants';

async function bootstrap() {
  const app = await initApplication();

  const PORT = process.env.PORT || 8080;
  const MODE = process.env.NODE_ENV || Env.DEVELOPMENT;

  return app.listen(PORT, () => console.log(`Server are running on ${PORT} in ${MODE} mode`));
}
bootstrap();
