import React from 'react';
import './Person.scss';

const Person = ({ name, gender }: { name: string; gender: string }) => (
  <div className={`person person--${gender}`}>{name}</div>
);

export default Person;
