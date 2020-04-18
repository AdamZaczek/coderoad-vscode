import * as React from 'react'
import useRouter from './components/Router'
import Workspace from './components/Workspace'
import ErrorView from './components/Error'
import LoadingPage from './containers/Loading'
import StartPage from './containers/Start'
import SelectTutorialPage from './containers/SelectTutorial'
import CompletedPage from './containers/Tutorial/CompletedPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'

const Routes = () => {
  const { context, send, Router, Route } = useRouter()

  // TODO: handle only full page errors
  if (context.error) {
    return (
      <Workspace>
        <ErrorView send={send} error={context.error} />
      </Workspace>
    )
  }

  return (
    <Workspace>
      <Router>
        {/* Setup */}
        <Route path={['Setup.Startup', 'Setup.ValidateSetup']}>
          <LoadingPage text="Launching..." processes={context.processes} />
        </Route>
        <Route path="Setup.Start">
          <StartPage send={send} context={context} />
        </Route>
        <Route path={['Setup.LoadTutorialSummary', 'Setup.LoadTutorialData', 'Setup.SetupNewTutorial']}>
          <LoadingPage text="Loading Tutorial..." processes={context.processes} />]
        </Route>
        <Route path="Setup.SelectTutorial">
          <SelectTutorialPage send={send} context={context} />
        </Route>
        <Route path={['Setup.SetupNewTutorial', 'Setup.StartNewTutorial']}>
          <LoadingPage text="Configuring tutorial..." />
        </Route>
        {/* Tutorial */}
        <Route path={['Tutorial.LoadNext', 'Tutorial.Level.Load']}>
          <LoadingPage text="Loading Level..." processes={context.processes} />
        </Route>
        <Route path="Tutorial.Level">
          <LevelSummaryPage send={send} context={context} />
        </Route>
        {/* Completed */}
        <Route path="Tutorial.Completed">
          <CompletedPage context={context} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
