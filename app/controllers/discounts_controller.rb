class DiscountsController < ApplicationController

  def index
    @discounts = Discount.all
    render json: @discounts
  end

  def show
    @discount = Discount.find params[:id]
    render json: @discount
  end
end
