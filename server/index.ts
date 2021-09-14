import { config, logger } from './common';
import { MigrationService } from './service';

(async () => {
  try {
    const migrationService = new MigrationService( config.database.from, config.database.to);
    await migrationService.migrate();
  } catch (e: any) {
    logger.error(e.stack);
    process.exit(-1);
  }
})();