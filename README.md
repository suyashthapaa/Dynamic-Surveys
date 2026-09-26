# Dynamic-Surveys
dyanmic surveys is a fill stack platform authenticated creators design adaptive surveys in a drag and drop workspace anonymous visitors can restore draft through an opaque browser cookie and submitted only analytics keep the resulting singnal clear
implemented frontend
react 19  tpyescript application compiled by vite vinext
editorial responsive landing page and creator authentication flows
protected creator workspace with survey cards availability control pubilc link copying and deletion 
drag and drop and keyboard  accessible question reordering with dependency order protection
full editors for text single select multi select and rating questions 
stable question option ids conditional rendering browser draft restoration quiet autosave required answer feedback closed survey state and completion state
anonymous public survey form with conditional rendering browser draft restoration quiet autosave required answeer feedback closed survey state after submissions
  submitted only analytics with text responsess option distributions and rating summaries
  creator account and active session management
  implemented backend
  creator registration email verification login refresh logout current user and session management apis
  bearer access tokens and database backed hashd refresh tokens in an httponly cookie
  creator owned survey crud with jsonb question definitions
  sttable uuid question and option identity across reordering
  text singleselect multiselect and rating questions 
  ordered single condition visibility rules with dependency type option ordeing self reference and cycle validation 
  separate anonymous respondent sessions in a secure opaque cookie 
  idempotent draft upserts and immutable final submissions
  schema locking after the first submitted response 
  submitted only analytics for all four question types
  redis backed ip submission attempt limiting 
  bullmq email producer worker infrastructure
  postgresql redis docker development services committed prisma migration unit tests and integration api tests
  stack and structure
  frontend react 19 typescript vite 8 vinext dnd kit lucie icons and custom css backend node js esm express 5 postgresql prisma 6 redis ioredis zod 4 bullmq bcrypt jwt helmet vitest and supertest
  dynamic surveys
  client
  app
  component
  lib
  public
  docker postgres init
  docker compose yml
  env example
  server
  prisma
  src
  configs
  db
  jobs email
  middlewares
  modules
  auth
  surveys
  respondent sessions 
  responses 
  analytics
  app ts
  server ts
  tests
  the organization follows the photodey my previous project reference versioned routers call thin controllers server own business rules repositories encapsulate routine persistence zod validates at the boundary and a central apierror apiresponse contract provides consistent json
  local setup
  requirements node js 22 13 and docker with compose start the infrastructure and api first
  docker compose up -d
  cd server
  cp env example env
  pnpm install 
  pnpm prisma generate 
  pnpm prisma migrate
  pnpm dev 
  then start the frontend in another terminal 
  cd client 
  cp env example env local 
  pnpm install 
  pnpm dev
  open http localhost 5173 the frontend defaults to http localhost 3000 for te api and includes credentials on every request so the refresh and anonymous respondent cookies work
  the default compose ports are postgresql 5434 and redis 6380 avoiding photodeys ports compose creates both dynamic surveys dev and the dedicated dynamic surveys test database on a new volume 
  check the real services with 
  docker compose ps
  docker compose exec postgres pg isready -u dynamic survey -d dynamic survey dev 
  docker compose exec postgres psql -u dynamic surveys -d dynamic survey dev -c "select 1"
  docker compose exec  redis redis cli no auth warning -a dynamic surveys redis dev ping 
  if an existing named volume predates the test database init script create the test database manually or recreate only this projects development volume if its contents are disposable
  enviroment 
  copy either root env example or server env example to server env replace access token secret in every non local environment production must use tls urls node env production an explicit cookie domain when needed and a trust proxy value matching the actual proxy topology never blindly set trust proxy for an unknown chain 
  email is deliberately disabled locally to use the worker set email delivery enable true and all smtp value then run 
  pnpm worker email 
  registration queues verification mail only when delivery is enabled the worker retries failed jobs three times with exponential backoff and has signal aware shutdown 
  the client supports these public variables
  next public api url http localhost 3000
  next public site url http localhost 5173
  for deployment both values must use real https origins the apis client url cors cookie security and optional cookie domain must be configured for that frontend origin
  vercel frontend deployment 
  import the repository in vercel and set the root directory to client vercel will run the vite build and publish dist the client vercel json rewrites all unknown paths to index html which is required for react router routes such as auth verify token s surveyid and surveys surveid to work on direct visits refreshes 
  set this vercel environment variable before deploying 
  vite api url https your public api example com
  then set the deployed frontend origin as client url in the api environment and deploy the api separately a vercel static frontend cannot call http localhost 3000 after deployment 
database and migrations 
the committed initial migration creates
user many usersession and survey rows cascade on user deletion 
survey many response rows cascade on session deletion 
respondentsession many response rows cascade on session deletion 
response with unique surveyid respondentsessionid and a draft submitted status
survey definition and answer use postgresql jsonb stable creator survey session response data stays relational indexed and foreign key constrained
pnpm prisma format
pnpm prisma validate
pnpm prisma generate 
pnpm prisma migrate
for tests apply the same committed migration with database url $test database url pnpm prisma migrate tests include a hard safety check and refuse to clean a database whose url does not contain dynamic survey test 
api response contract 
success
  success tru statuscode 200 message data
  error
  success false statuscode 400 message errors
  routes 
  method             route                 access           get       health                         public
  post      api v1 auth sign up            public 
  get       api v1 auth verify token       public 
  post      api v1 auth resend verification public
  post      api v1 auth sign in             public
  post      api v1 auth refresh             refresh cookie  
  post      api v1 auth logout            creator 
  post      api v1 auth logout all       creator 
  get       api v1 auth me              creator
  get       api v1 auth sessions         creator 
  post get  api v1 auth survey          creator
  get delete  api v1 survey surveyid          owwner 
  patch      api v1 surveys surveyid metadata owner    
  put       api v1 survey surveyid schema      owner 
  patch     api v1 survey surveyid accepting responses owner      
  get       api v1 surveys surveyid analytics     owner 
  get       api v1 public surveys surveyid     anonymous cookie 
  get put   api v1 public surveys surveyid response  anonymous cookie 
  post       api v1 public survey surveyid submissions  anonymous cookie + limit
  creator routes deliiberately return 404 for a survey owned by someone else preventing ownership enumeration there is no global admin bypass
  json formats and conditional logic 
  qustions
  id 
  type
  lable
  required
  optios 
  id 
  id
  id
  type     "text"
  label 
  required 
  maxlength
  condition
  sourcequestionid
  operation  "equal"
  value 
  equals supports text single select option ids and ratings supports multi select option ids the controller must precede the dependent question unknown self circular type incompatible references and reordering that break dependency order are rejected
  answers are keyed only by stable qestion ids
  11111111-1111-4111-8111-111111111111 11111111 1111 4111 8111-111111111112
  22222222-2222-4222-8222-222222222222 a survey api
  drafts may omit required answer but every present answer is fully validated this implementation rejects answer for currently hidden question rather than silently storing them final submission requires every visible required answer ignores hidden questions for requiredness and rejects unknown ids forged options invalid types duplicate multi select values and rating outside integar 
 