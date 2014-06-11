require 'rails_helper'

feature 'The one-page contact manager app' do

  scenario 'User can see all people on home page', js: true do
      Person.create!(
        first_name: "Joe",
        last_name: "Example",
        address: "15 Main St"
      )

        Person.create!(
          first_name: "Edna",
          last_name: "Example",
          address: "15 Oak St"
        )

    visit '/'
    expect(page).to have_content "Joe Example"
    expect(page).to have_content "15 Main St"
    expect(page).to have_content "Edna Example"
    expect(page).to have_content "15 Oak St"
  end

  scenario 'User can add a person and see them on the page', js: true do
    visit '/'
    fill_in 'First name', with:'John'
    fill_in 'Last name', with:'Snow'
    fill_in 'Address', with:'555 pearl st'
    click_on 'Submit'
  end

end