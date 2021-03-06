# -*- coding: utf-8 -*-
require 'smg_api'
class SessionsController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:create]

  # POST /resource/sign_in
  def create
    username = params['user']['username']
    password = params['user']['password']
    @user = User.find_by(username: username)
    unless @user
      smg_api = SmgApi.new(username, password)
      if smg_api.user_valid?
        new_user = User.new(username: username)
        new_user.password = password
        new_user.save
        @user = new_user
      end
    end
    if @user && @user.valid_password?(password)
      sign_in :user, @user
      render json: @user, serializer: SessionSerializer, root: nil
    else
      invalid_login 'Неверный логин или пароль.'
    end
  end

  # DELETE /resource/sign_out
  def destroy
    warden.logout
    head :no_content
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
  private

    def invalid_login message
      warden.custom_failure!
      render json: {error: message}, status: :unprocessable_entity
    end

end
