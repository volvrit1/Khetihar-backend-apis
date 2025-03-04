import env from "#configs/env";
import server from "#configs/server";

server.listen(env.PORT, () => {
  console.log(`Server is running on PORT ${env.PORT}`);
});
