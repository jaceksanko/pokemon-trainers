# Getting Started

Requirements:

- docker
- gnu make

Clone the repository

```bash
git clone https://github.com/jaceksanko/pokemon-trainers.git
```

Install dependencies and husky settings

```bash
make install
```

For development server:

```bash
make dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Other commands

For production server:

```bash
make prod
```

Cleaning containers:

```bash
make clean
```

# Tests

Running tests 

```bash
npm test
```

Running Codegen
```bash
npm run test:record
```