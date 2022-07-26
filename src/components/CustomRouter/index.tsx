import { useLayoutEffect, useState, ReactNode, FC } from 'react';
import { RouteProps, Router, RouterProps } from 'react-router-dom';

interface IProps {
    basename: string;
    children: ReactNode
    history: any
}

const CustomRouter:FC<IProps> = ({basename, children, history}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter