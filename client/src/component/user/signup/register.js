import React from 'react';
import { connect } from 'react-redux';
import { Card,CardContent,Typography, TextField,FormControlLabel,Checkbox ,CheckboxProps,FormGroup,Box, Container,Button} from '@material-ui/core';
import { Form,Formik ,Field, useField,ErrorMessage} from 'formik';
import { object, string, array, date } from 'yup';
import * as Yup from 'yup';

import { registerUser } from '../../../store/action/register_user';



const initialValues = {
    fullname:'',
    email:'',
    mnumber: '',
    dob:'',
    address:'',
    degree:'',
    skills:[],
    yearexperience:'',
    password: ''
};


function FormDemo(props){
    return(
        <Container style={{width:800}}>
        <Card>
            <CardContent>
                <Typography variant="h4">New Account</Typography>
                    
                <Formik 
                validationSchema={
                    object({
                        name:string().required('Required !!').min(2).max(100),
                        email:string('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i').required('Required !!').email('Invalid email address'),
                        mnumber: string().required('Mobile number is required !!').max(10),
                        dob:date().required('Birth date is required !! '),
                        address: string().required('Required !!').max(150),
                        degree: string().required('Required !!').max(10),
                        skills: array(string().oneOf(['JavaScript', 'Reactjs', 'Angular', 'Node', 'PHP'])).min(3),
                        yearexperience:string().required('Mobile number is required !!').max(15),
                        password:Yup.string().required("This field is required !!").min(6).max(10),
                        cpassword: Yup.string().required("Password required !!").oneOf([Yup.ref("password"), null], "Passwords must match")
                    })
                }
                
                initialValues={initialValues} onSubmit={(values,{resetForm})=>{
                    resetForm({});
                        return new Promise(res =>{
                        setTimeout(() => {
                                props.dispatch(registerUser(values));
                                alert('Congrats !! Registered successfully')
                                res();
                        }, 2000);
                    })
                }}>
                    {({ isSubmitting,isValidating })=>(
                        <Form>
                            <Box marginBottom={2} marginTop={4}>
                                <FormGroup>
                                <Field name="name" as={TextField} label="Full Name"  autoFocus />
                                <ErrorMessage name="name"/>
                                </FormGroup>
                            </Box>

                             <Box marginBottom={2}>
                                <FormGroup>
                                <Field name="email" as={TextField} label="Email Address"/>
                                <ErrorMessage name="email"/>
                                </FormGroup>
                            </Box>
                           

                           <Box marginBottom={2}>
                            <FormGroup>
                            <Field name="mnumber" type="number" as={TextField} label="Mobile number" />
                            <ErrorMessage name="mnumber"/>
                            </FormGroup>
                            </Box>

                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field name="dob" type="date" as={TextField} 
                                label="Select your birth date" InputLabelProps={{ shrink: true,}} />
                                <ErrorMessage name="dob"/>
                                </FormGroup>
                            </Box>


                            <Box marginBottom={2}>
                                <FormGroup>
                                <Field name="address" 
                                as={TextField} 
                                multiline rows={2} 
                                rowsMax={10} 
                                label="Your Address"
                                />
                                <ErrorMessage name="address"/>
                                </FormGroup>
                            </Box>

                            <Box marginBottom={2}>
                            <FormGroup>
                            <Field name="degree" as={TextField} label="Higher Education" />
                            <ErrorMessage name="degree"/>
                            </FormGroup>
                            </Box>

                            <Box marginBottom={2} textAlign="left">
                            <label>Technical Skills</label>
                            <FormGroup>
                            < MyCheckbox name="skills" value="JavaScript" type="checkbox" label="JavaScript" />
                            < MyCheckbox name="skills" value="Reactjs" type="checkbox" label="Reactjs" />
                            < MyCheckbox name="skills" value="Angular" type="checkbox" label="Angular" />
                             < MyCheckbox name="skills" value="Node" type="checkbox" label="Node" />
                             < MyCheckbox name="skills" value="PHP" type="checkbox" label="PHP" />
                            <ErrorMessage name="skills"/>
                            </FormGroup>
                            </Box>

                            <Box marginBottom={2}>
                            <FormGroup>
                            <Field name="yearexperience" type="number" as={TextField} label="Total Experinece" />
                            <ErrorMessage name="yearexperience"/>
                            </FormGroup>
                            </Box>

                             <Box marginBottom={2}>
                                <FormGroup>
                                <Field name="password" type="password" as={TextField} label="password" />
                                </FormGroup>
                                <ErrorMessage name="password"/>
                            </Box>

    

                             <Box marginBottom={2}>
                                <FormGroup>
                                <Field name="cpassword" type="password" as={TextField} label="Confirm password" />
                                <ErrorMessage name="cpassword"/>
                                </FormGroup>
                            </Box>
                            


                             

                             <Button type="submit" variant="contained" color="primary" 
                                disabled={isSubmitting || isValidating}>Login
                             </Button>
                             
                            
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
        </Container>
    )
}

function mapStateToProps(state){
    console.log(state)
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(FormDemo);

export interface MyCheckboxProps extends CheckboxProps {
    name:string,
    value:string | Number;
    label ?:string
}

export function MyCheckbox(props:MyCheckboxProps){
    const [field] = useField({
        name:props.name,
        type:'checkbox',
        value:props.value
    })
    return <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />
}