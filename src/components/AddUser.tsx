import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { CustomLoader } from './Loader'
import { H1 } from '../styles/Taqstyles'
import { CustomButton } from './Button';
import Form from './Form'

const CREATE_OPERATION = gql`
  mutation CreateOp($email:String!, $password:String!, $name:String!, $role:UserRoleType!, $cpf:String!, $birthDate:String!){
    UserCreate(data: {
        email: $email
        password: $password
        name: $name
        role: $role
        cpf: $cpf
        birthDate: $birthDate
    }){
        name
        email
    }
  }
  `

export interface AddUserProps extends RouteComponentProps {
}

export default class AddUser extends React.Component<AddUserProps> {

  private validFields = {
    email: '',
    password: '',
    cpf: '',
    role: '',
    birthDate: '',
    name: ''
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_OPERATION}
        variables={this.validFields}
        onCompleted={this.handleCreateSuccess}
      >
        {(mutation: MutationFn<any>, result: MutationResult) => {
          if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
          return (
            <>
              <form className="Login" onSubmit={(event) => this.submit(mutation, event)}>
                <H1>
                  Preencha os dados do novo usuário
                </H1>
                {result.error && <div style={{ textAlign: 'center', color: 'red' }}>
                  {"Erro!" + result.error.message}</div>}

                <div style={{ marginLeft: '45.5%', marginRight: '46%' }}>
                  <Form type="email" setFieldValue={this.setFieldValue}></Form>
                  <Form type="password" setFieldValue={this.setFieldValue}></Form>
                  <Form type="name" setFieldValue={this.setFieldValue}></Form>
                  <Form type="role" setFieldValue={this.setFieldValue}></Form>
                  <Form type="cpf" setFieldValue={this.setFieldValue}></Form>
                  <Form type="birthDate" setFieldValue={this.setFieldValue}></Form>
                </div>
                <div style={{ textAlign: "center" }}>
                  <CustomButton type="submit" title="Criar" />
                </div>
              </form>
            </>
          )
        }}
      </Mutation>
    );
  }

  private handleCreateSuccess = (data: any) => {
    this.props.history.push('/users');
  }
  private submit = async (mutationFn: MutationFn, event: React.FormEvent) => {
    const isFormValid: boolean = !!this.validFields.email &&
      !!this.validFields.name &&
      !!this.validFields.cpf &&
      !!this.validFields.role &&
      !!this.validFields.birthDate &&
      !!this.validFields.password;

    if (isFormValid) {
      mutationFn({ variables: this.validFields });
    }
  }

  private setFieldValue = (value: string, type: string, valid: boolean) => {
    switch (type) {
      case 'email':
        if (valid) this.validFields.email = value
        break;
      case 'name':
        if (valid) this.validFields.name = value
        break;
      case 'password':
        if (valid) this.validFields.password = value
        break;
      case 'cpf':
        if (valid) this.validFields.cpf = value
        break;
      case 'birthDate':
        if (valid) this.validFields.birthDate = value
        break;
      case 'role':
        if (valid) this.validFields.role = value
        break;
      default:
        break;
    }
  }
}

