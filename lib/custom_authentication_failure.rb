class CustomAuthenticationFailure < Devise::FailureApp
  protected
    def redirect_url
      new_user_session_path
    end
end
