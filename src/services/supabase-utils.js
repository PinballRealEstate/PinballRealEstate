import { client } from './client';

export async function getUser(){
  return client.auth.session() && client.auth.session().user;
}

export async function signIn(email, password){
  const { user } = await client.auth.signIn({ email, password });
  return user;
}

export async function signUp(email, password){
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function logout(){
  await client.auth.signOut();
  return (window.location.href = '../signin');
}

export async function getFavoriteHomes(){
  const { body } = await client
    .from('saved')
    .select('*');

  return body;
}

export async function getProfile(){
  const { body } = await client
    .from('profiles')
    .select('*');

  return body;
}

export async function getFilters() {
  const { body } = await client
    .from('filters')
    .select('*');

  return body;
}

export async function createProfile({ username }) {
  const { body } = await client
    .from('profiles')
    .insert({ username });

  return body;
}

export async function createFilter({ zip_code, low_price, high_price }){
  const { body } = await client
    .from('filters')
    .insert({ zip_code, low_price, high_price });

  return body;
}