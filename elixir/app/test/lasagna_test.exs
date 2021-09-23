defmodule LasagnaTest do
  use ExUnit.Case
  doctest Lasagna

  test "Define the expected oven time in minutes" do
    assert Lasagna.expected_minutes_in_oven() == 40
  end

  test "Calculate the remaining oven time in minutes" do
    assert Lasagna.remaining_minutes_in_oven(30) == 10
  end

  test "Calculate the  preparation time in minutes" do
    assert Lasagna.preparation_time_in_minutes(2) == 4
  end

  test "Calculate the total working time in minutes" do
    assert Lasagna.total_time_in_minutes(3, 20) == 26
  end

  test "Create a notification that the lasagna is ready" do
    assert Lasagna.alarm() == "Ding!"
  end
end
