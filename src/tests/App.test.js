import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import myMock from './myMock';
import TableContext from '../context/TableContext';
import testData from '../../cypress/mocks/testData';

const mockFetch = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );
}

describe('test for the Star Wars Search app', () => {
  beforeEach(() => mockFetch());
	afterEach(() => {
		jest.clearAllMocks();
	});beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
  });


  it('verify if elements are rendering on the screen', async () => {

    render(
        <App />
    )
    console.log(screen.logTestingPlaygroundURL());

    const appTitle = screen.getByRole('heading', {name: /Star Wars/i, level:1});
    const teste = screen.getByRole('heading', {name: /Table/i, level:4});
    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisionFilter = screen.getByTestId('comparison-filter');
    const filter = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter')
    const table = screen.getByText(/Name/i)
    expect(appTitle).toBeInTheDocument();
    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisionFilter).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(teste).toBeInTheDocument();
    expect(appTitle).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument());
    expect(screen.getAllByRole('row')).toHaveLength(11);
    userEvent.type(nameFilter, 'oo')
    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(3));
  })
  it('verify fetch', async () => {
    render(
        <App />
    )

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('verify if elements are acessible', async () => {

    render(
        <App />
    );

    const button = screen.getByTestId('button-filter')

    const myButtons = screen.getAllByRole('button');
    expect(myButtons).toHaveLength(1);

    userEvent.click(button)

    const myButtons1 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons1).toHaveLength(3));

    userEvent.click(button)

    const myButtons2 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons2).toHaveLength(4));

    userEvent.click(button)

    const myButtons3 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons3).toHaveLength(5));

    userEvent.click(button)

    const myButtons4 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons4).toHaveLength(6));

    userEvent.click(button)

    const myButtons5 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons5).toHaveLength(7));

    userEvent.click(myButtons5[myButtons5.length-1]);

    const myButtons6 = screen.getAllByRole('button');
    await waitFor(() => expect(myButtons6).toHaveLength(1));

  });

  it('verify if filters are working', async () => {
    render(
        <App />
    )      
    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument());

    const columns = screen.getAllByRole('combobox');
    const filter = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter')

    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveLength(5);
    expect(screen.getAllByRole('row')).toHaveLength(11);

    userEvent.selectOptions(columns[0], ['population']);
    userEvent.selectOptions(columns[1], ['maior que']);
    userEvent.type(filter, '200000');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(7));
    expect(columns[0]).toHaveLength(4);

    userEvent.selectOptions(columns[0], ['orbital_period']);
    userEvent.selectOptions(columns[1], ['menor que']);
    userEvent.type(filter, '5000');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(7));
    expect(columns[0]).toHaveLength(3);

    userEvent.selectOptions(columns[0], ['diameter']);
    userEvent.selectOptions(columns[1], ['maior que']);
    userEvent.type(filter, '12000');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(2);

    userEvent.selectOptions(columns[0], ['rotation_period']);
    userEvent.selectOptions(columns[1], ['igual a']);
    userEvent.type(filter, '24');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(1);

    userEvent.selectOptions(columns[0], ['surface_water']);
    userEvent.selectOptions(columns[1], ['maior que']);
    userEvent.type(filter, '20');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(0);

    const myButtons = screen.getAllByRole('button');
    expect(myButtons).toHaveLength(7);
    userEvent.click(myButtons[4]);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(1);

    const myButtons1 = screen.getAllByRole('button');
    expect(myButtons1).toHaveLength(6);
    userEvent.click(myButtons[3]);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(2);

    const myButtons2 = screen.getAllByRole('button');
    expect(myButtons2).toHaveLength(5);
    userEvent.click(myButtons[2]);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
    expect(columns[0]).toHaveLength(3);

    const myButtons3 = screen.getAllByRole('button');
    expect(myButtons3).toHaveLength(4);
    userEvent.click(myButtons[3]);
  });
})

//testes seguindo a lógica do Gabriel
