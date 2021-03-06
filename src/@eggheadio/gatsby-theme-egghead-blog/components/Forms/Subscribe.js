import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import { withTheme } from '@eggheadio/gatsby-theme-egghead-blog/src/components/Theming'
import { rhythm } from '@eggheadio/gatsby-theme-egghead-blog/src/lib/typography'
import { bpMaxSM } from '@eggheadio/gatsby-theme-egghead-blog/src/lib/breakpoints'
import Message from '@eggheadio/gatsby-theme-egghead-blog/src/components/ConfirmMessage/Message'
import { PleaseConfirmIllustration } from '@eggheadio/gatsby-theme-egghead-blog/src/components/ConfirmMessage/Illustrations'

const FORM_ID = '1163892'
const API_KEY = 'r0Wz2gx1CzL5iuWVu5KsEw'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      <Message
        illustration={PleaseConfirmIllustration}
        title={`Great, one last thing...`}
        body={`I just sent you an email with the confirmation link. 
          **Please check your inbox!**`}
      />
    </div>
  )
}

class SignUp extends React.Component {
  state = {
    submitted: false,
  }
  setSubmitting = () => null

  async handleSubmit(values) {
    const withKey = { ...values, api_key: API_KEY }
    this.setState({ submitted: true })
    try {
      const response = await fetch(
        `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`,
        {
          method: 'post',
          body: JSON.stringify(withKey, null, 2),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      const responseJson = await response.json()
      this.setSubmitting(false)
      this.setState({
        submitted: true,
        response: responseJson,
        errorMessage: null,
      })
    } catch (error) {
      this.setState({
        submitted: false,
        errorMessage: 'Something went wrong!',
      })
    }
  }

  render() {
    const { submitted, response, errorMessage } = this.state
    const { theme } = this.props
    const successful = response && response.status === 'success'

    return (
      <div>
        {!successful && (
          <h2
            css={css`
              margin-bottom: ${rhythm(1)};
              margin-top: 0;
            `}
          >
            Join the Newsletter
          </h2>
        )}

        <Formik
          initialValues={{
            email_address: '',
            first_name: '',
          }}
          validationSchema={SubscribeSchema}
          onSubmit={(values) => this.handleSubmit(values)}
          render={({ errors, touched, isSubmitting, setSubmitting }) => {
            this.setSubmitting = setSubmitting
            return (
              <>
                {!successful && (
                  <Form
                    css={css`
                      display: flex;
                      align-items: flex-end;
                      button {
                        margin-left: 10px;
                      }
                      .field-error {
                        display: block;
                        color: ${theme.colors.red};
                        font-size: 80%;
                      }
                      input,
                      label {
                        width: 100%;
                      }
                      ${bpMaxSM} {
                        flex-direction: column;
                        align-items: flex-start;
                        width: auto;
                        label,
                        input {
                          margin: 5px 0 0 0 !important;
                          width: 100%;
                          display: flex;
                          flex-direction: column;
                        }
                        button {
                          margin: 20px 0 0 0;
                        }
                      }
                    `}
                  >
                    <label htmlFor="first_name">
                      <div
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          align-items: flex-end;
                        `}
                      >
                        First Name
                        <ErrorMessage
                          name="first_name"
                          component="span"
                          className="field-error"
                        />
                      </div>
                      <Field
                        aria-label="your first name"
                        aria-required="false"
                        name="first_name"
                        placeholder="Jane"
                        type="text"
                      />
                    </label>
                    <label
                      htmlFor="email"
                      css={css`
                        margin-left: 10px;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          align-items: flex-end;
                        `}
                      >
                        Email
                        <ErrorMessage
                          name="email_address"
                          component="span"
                          className="field-error"
                        />
                      </div>
                      <Field
                        aria-label="your email address"
                        aria-required="true"
                        name="email_address"
                        placeholder="jane@acme.com"
                        type="email"
                      />
                    </label>
                    <button
                      data-element="submit"
                      type="submit"
                      disabled={isSubmitting}
                      css={css`
                        color: ${theme.colors.black};
                      `}
                    >
                      {!isSubmitting && 'Submit'}
                      {isSubmitting && 'Submitting...'}
                    </button>
                  </Form>
                )}
                {submitted && !isSubmitting && (
                  <PostSubmissionMessage response={response} />
                )}
                {errorMessage && <div>{errorMessage}</div>}
              </>
            )
          }}
        />
      </div>
    )
  }
}

export default withTheme(SignUp)
