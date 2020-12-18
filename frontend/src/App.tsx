import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar/Navbar';
import { VideoForm } from './components/Video/VideoForm';
import { VideoList } from './components/Video/VideoList';

export const App = () => {
    return (
        <Router>
            <Navbar />

            <div className="container">
                <Switch>
                    <Route exact path='/' component={ VideoList } />
                    <Route exact path='/new-video' component={ VideoForm } />
                    <Route exact path='/update/:id' component={ VideoForm } />
                </Switch>

                <ToastContainer />
            </div>
        </Router>
    )
}