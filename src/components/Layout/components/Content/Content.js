import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calendar from '../../../../features/Calendar';
import NotFound from '../../../../features/NotFound';
import Patients from '../../../../features/Patients';

const Content = () => {
  return (
    <main className="content" style={{ padding: 20 }}>
      <Switch>
        <Route path="/patients" component={Patients} />
        <Route exact path="/" component={Calendar} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Content;
