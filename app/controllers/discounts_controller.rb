class DiscountsController < ApplicationController

  def index
    @discounts = Discount.includes(:category, :addresses).order(id: :desc).all
    render json: @discounts
  end

  def show
    @discount = Discount.find params[:id]
    render json: @discount
  end
end
