import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import AppStore, { history } from './actions/store/AppStore'
import Home from './pages/Home'
import './static/css/main.css'
import Dashboard from './pages/Dashboard'
import { Switch } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import App from './components/App'

const theme = createMuiTheme({})

render(
    <ThemeProvider theme={theme}>
        <Provider store={AppStore}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/login" component={(props) => <Home {...props} />} />
                    <Route
                        path="/"
                        component={(props) => <AuthRoute {...props} component={App} />}
                    />
                </Switch>
                <Route exact path="/dashboard" component={(props) => <Dashboard {...props} />} />
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
)
