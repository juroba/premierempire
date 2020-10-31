import React from 'react'
import { render } from 'react-dom'
import { Redirect, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import AppStore, { history } from './store/AppStore'
import Home from './Home'
import './static/css/main.css'

const theme = createMuiTheme({})

render(
    <ThemeProvider theme={theme}>
        <Provider store={AppStore}>
            <ConnectedRouter history={history}>
                <Route exact path="/login" component={(props) => <Home {...props} />} />
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
)
