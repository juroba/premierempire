import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import AppStore, { history } from './store/AppStore'
import Home from './pages/Home'
import './static/css/main.css'
import Dashboard from './pages/Dashboard'

const theme = createMuiTheme({})

render(
    <ThemeProvider theme={theme}>
        <Provider store={AppStore}>
            <ConnectedRouter history={history}>
                <Route exact path="/login" component={(props) => <Home {...props} />} />
                <Route exact path="/dashboard" component={(props) => <Dashboard {...props} />} />
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
)
