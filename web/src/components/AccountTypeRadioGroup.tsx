import React from 'react'

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel 
} from '@material-ui/core'


enum AccountTypeOptions {
  TEST_ONLY = 'Test Only',
  ORG_ACCOUNT = 'Joining Org'
}

/**
 * For use with Formik!
 * 
 * initialValue = {
 *  testOnly: false
 *  // etc
 * }
 * values should contain a boolean called 'testOnly'
 */

const AccountTypeRadioGroup: React.FC<{
    // from Formik docs
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void
  values: { [field: string]: any }
}> = ({
  setFieldValue,
  values
}) => {

  const handleAccountTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('testOnly', (event.currentTarget.value === AccountTypeOptions.TEST_ONLY.toString()))
  }

  return (
    <FormControl component="fieldset" className='account-type-outer'>
      <FormLabel component="legend">Account Type</FormLabel>
      <RadioGroup 
        name={'accountType'} 
        value={values.testOnly ? AccountTypeOptions.TEST_ONLY.toString() : AccountTypeOptions.ORG_ACCOUNT.toString()}
        onChange={handleAccountTypeSelection}
      >
        <FormControlLabel value={AccountTypeOptions.TEST_ONLY.toString()} control={<Radio />} label={AccountTypeOptions.TEST_ONLY.toString()} />
        <FormControlLabel value={AccountTypeOptions.ORG_ACCOUNT.toString()} control={<Radio />} label={AccountTypeOptions.ORG_ACCOUNT.toString()} />
      </RadioGroup>  
    </FormControl>            
  )
}