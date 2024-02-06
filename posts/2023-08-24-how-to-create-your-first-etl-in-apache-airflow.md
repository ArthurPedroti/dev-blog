---
title: How to create your first ETL in Apache Airflow
description: Learn how to retrieve data from an API and populate it in a Data Warehouse
date: 2023-08-24 12:23:56
image: assets/img/how-to-create-your-first-etl-in-apache-airflow.png
category: misc
background: "#7AAB13"
---
## Introduction

Today, we are going to learn how to set up an ETL workflow in Airflow. We will explore the core concepts of this tool, understand how to customize and simplify our development process, all of which will be demonstrated using a real-world example: retrieving data from a source, processing that data, and storing it in a data warehouse.

## Creating Your Virtual Environment in Python and Installing Airflow

To begin our project, we need to create a separate environment to run it without installing all the libraries directly on our computer. The best way to achieve this is by creating a virtual environment in Python.

To do that, we will run the following command:

```bash
python3 -m venv venv
```

The Python command can vary based on your installation, but the arguments remain the same.

Now, we need to activate our virtual environment so that all the commands are executed within it.

```bash
source venv/bin/activate
```

Your terminal will look like this:

![venv label on terminal header](assets/img/how-to-create-your-first-etl-in-apache-airflow-01.png "venv label on terminal header")

If you are using a different terminal, the virtual environment in Python might have other scripts such as **`activate.fish`** or **`activate.ps1`**, depending on your terminal type.

### Installing Airflow

To install Airflow, you can use the **`pip`** package manager. The installation process is quite straightforward, but the command will vary depending on the specific version of Airflow and your Python version.

In the example below, we will install Airflow version 2.7.0 using Python version 3.10.12:

```bash
pip install "apache-airflow==2.7.0" --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.0/constraints-3.10.txt"
```

Please note that you might need to adjust the version numbers to match your requirements.

For more details and updates, see the docs below:

[Installation from PyPI — Airflow Documentation (apache.org)](https://airflow.apache.org/docs/apache-airflow/stable/installation/installing-from-pypi.html)

### Running Airflow

Now, let's run Airflow for the first time. To do this, we need to specify where we want to store all the files related to Airflow. We accomplish this by setting an environment variable called **`AIRFLOW_HOME`**:

```bash
export AIRFLOW_HOME=$(pwd)/airflow
```

We can use **`$(pwd)`** to create a new folder called "airflow" within your project folder (assuming that you are executing the commands from within your project folder).

Next, you can run the command to start Airflow:

```bash
airflow standalone
```

Now, you can access **`localhost:8080`** in your web browser to log in to your Airflow:

![Aiflow login screen](assets/img/how-to-create-your-first-etl-in-apache-airflow-02.png "Aiflow login screen")

The default username is "admin," and you can find the password in the file "standalone_admin_password.txt" located within the Airflow folder.

```
.
├── venv
└── airflow/
    └── standalone_admin_password.txt
```

## Creating a Hook

A hook in Airflow is an abstraction of a specific API that allows Airflow to interact with external systems.While hooks are integrated into many operators, you can also utilize them directly within DAG code.

The purpose of creating a new Hook is to have the ability to create a custom function that takes parameters, implements a specific logic for the request, and delegates error handling to the Airflow Hook base, which will manage connections and handle errors during execution.

In this scenario, we will create a Hook to manage our connection with the API from which we will collect data.

The initial step is to establish a connection to store our credentials. To achieve this, follow these steps:

1. Access Airflow's web interface.
2. Navigate to the "Admin" menu, then select "Connections."
3. Click on the "+" button to add a new connection:

![Add connection button ](assets/img/how-to-create-your-first-etl-in-apache-airflow-03.png "Add connection button ")

Let's proceed with the creation of the connection and the hook:

1. Connection Details:

   * `Connection Id`: api_connection_example
   * `Connection Type`: HTTP
   * `Host`: **[https://example.com.br](https://example.com.br/)**

After creating the connection, we will move on to creating the actual hook. Here's what you need to do:

1. Creating the Hook:

   * Create a folder “hooks” in your Airflow project directory.
   * Inside this folder, create a file named **`example_hook.py`**.

```
.
├── venv
└── airflow/
    └── hooks/
        └── example_hook.py
```

To begin creating our hook, ou will create a class that inherits from the HttpHook class, and create a standard function to launch the hook and create the connection, based on the connection we created in the airflow:

```python
from airflow.providers.http.hooks.http import HttpHook

class ExampleHook(HttpHook):
    
    def __int__(self, conn_id=None):
        self.conn_id = conn_id or "api_connection_example"
        super().__init__(http_conn_id=self.conn_id)
```

After that, we'll create our function that will make the request, as we said, the connection itself is responsible for the airflow, so we'll use one method to create a session (the connection), and we'll use another method to execute the request:

```python
def make_request(self, session):
    request = requests.Request("GET", f"{self.base_url}/{self.query}")
    prep = session.prepare_request(request)
    self.log.info((f"URL: {self.query}"))
    
    return self.run_and_check(session, prep, {}).json()
```

Finally, we need to create the main function that will be executed when the hook is called:

```python
# example_hook.py
from airflow.providers.http.hooks.http import HttpHook
import requests

class ExampleHook(HttpHook):
    
		def __init__(self, query, params, conn_id=None):
        self.query = query
        self.params = params
        self.conn_id = conn_id or "api_connection_example"
        super().__init__(http_conn_id=self.conn_id)
        
    def make_request(self, session):
        request = requests.Request("GET", f"{self.base_url}/{self.query}", params=self.params)
        prep = session.prepare_request(request)
        self.log.info((f"URL: {self.query}"))
        
        return self.run_and_check(session, prep, {}).json()
    
    def run(self):
        session = self.get_conn()
        
        return self.make_request(session)
```

We can test our hook by adding an **`if`** statement at the end of the file to execute it when we run our hook directly in the terminal:

```python
if __name__ == "__main__":
    route = "my_custom_route"
    params = {
        "name": "arthur"
    }
    
    response = ProtheusApiHook(route, params).run()
    print(json.dumps(response, indent=4, sort_keys=True))
```

And run the command in the terminal:

```bash
python airflow/hook/example_hook.py
```

If everything runs correctly we will see the json response in the terminal.

## Creating an Operator

Operators serve as the fundamental components of Airflow DAGs, containing the logic for data processing within a pipeline. Each task within a DAG is defined by instantiating an operator.

To create our operator, let's proceed by creating a folder “operators” and then creating a file named **`example_operator.py`**:

```bash
.
├── venv
└── airflow/
    ├── hooks
    └── operators/
        └── example_operator.py
```

We will begin by creating the base code for our operator, which is quite similar to creating a hook. We'll establish an **`__init__`** method to initialize the operator and an **`execute`** method that will be invoked when the operator is called:

```python
# example_operator.py
from airflow.models import BaseOperator

class ExampleOperator(BaseOperator):
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def execute(self, context):
        return
```

The next step is to create the function that will receive data from our hook and store it in our database.

We can accomplish this using an Operator as well, but since we are creating our own operator, we have the flexibility to use other libraries and functions to achieve our goals.

Therefore, we will install the **psycopg** package to establish a connection and input the data into a Postgres database:

```python
pip install psycopg2-binary
```

And our function will look like this:

```python
def save_data_to_postgres(self, data):
    try:
        # Replace these with your PostgreSQL database credentials
        conn = psycopg2.connect(
            database='database',
            user='postgres',
            password='postgres',
            host='localhost',
            port='5432'
        )

        cursor = conn.cursor()

        # Create a table if it doesn't exist
        create_table_query = """
            CREATE TABLE IF NOT EXISTS example (
                name TEXT,
                qty INTEGER
            );
        """
        cursor.execute(create_table_query)

        # Insert data into the table
        insert_query = """
            INSERT INTO example (name, qty)
            VALUES (%s, %s);
        """

        values = (
            data['name'], data['qty']
        )
        cursor.execute(insert_query, values)

        conn.commit()
        print("Data saved successfully to PostgreSQL.")
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL or saving data:", error)
    finally:
        # Close the database connection
        if conn:
            cursor.close()
            conn.close()
```

And in our **execute** function, we will call our hook and our function:

```python
def execute(self, context):
    query = self.query
    query_params = self.query_params
    
    json_response = ExampleHook(query, query_params).run()
    self.save_data_to_postgres(json_response[0])
```

We can test our operator in a manner similar to how we tested the hook. However, to execute the operator, we need to create a DAG that includes a task. In the next topic, we will delve deeper into the creation of the DAG and its associated tasks.

Another important thing is using the **sys** package to help Airflow locate the directory containing our hook:

```python
# airflow/operators/example_operator.py
import sys
sys.path.append("airflow")

from datetime import datetime
from airflow.models import BaseOperator, DAG, TaskInstance
from hooks.example_hook import ExampleHook
import psycopg2

class ExampleOperator(BaseOperator):

		template_fields = ["query", "query_params"]
    
    def __init__(self, query, query_params, **kwargs):
        self.query = query
        self.query_params = query_params
        super().__init__(**kwargs)
    
    def save_data_to_postgres(self, data):
		    try:
		        # Replace these with your PostgreSQL database credentials
		        conn = psycopg2.connect(
		            database='database',
		            user='postgres',
		            password='postgres',
		            host='localhost',
		            port='5432'
		        )
		
		        cursor = conn.cursor()
		
		        # Create a table if it doesn't exist
		        create_table_query = """
		            CREATE TABLE IF NOT EXISTS example (
		                name TEXT,
		                qty INTEGER
		            );
		        """
		        cursor.execute(create_table_query)
		
		        # Insert data into the table
		        insert_query = """
		            INSERT INTO example (name, qty)
		            VALUES (%s, %s);
		        """
		
		        values = (
		            data['name'], data['qty']
		        )
		        cursor.execute(insert_query, values)
		
		        conn.commit()
		        print("Data saved successfully to PostgreSQL.")
		    except (Exception, psycopg2.Error) as error:
		        print("Error while connecting to PostgreSQL or saving data:", error)
		    finally:
		        # Close the database connection
		        if conn:
		            cursor.close()
		            conn.close()
	        
    def execute(self, context):
        query = self.query
        query_params = self.query_params
        
        json_response = ExampleHook(query, query_params).run()
        self.save_data_to_postgres(json_response[0])
        
if __name__ == "__main__":
		route = "my_custom_route"
    params = {
        "name": "arthur"
    }
    
    with DAG(dag_id = "ExampleDAG", start_date=datetime.now()) as dag:
        operator = ExampleOperator(query=query, query_params=query_params, task_id="test_run")
        ti = TaskInstance(task=operator)
        operator.execute(ti.task_id)
```

## Creating a DAG

In Airflow, data pipelines are defined using Python code as Directed Acyclic Graphs (DAGs). In a DAG, each node represents a task that performs a specific unit of work, and each edge represents a dependency between tasks.

In this example, we will create a DAG that consists of a single task, which executes our operator.

Let's begin by setting up the basic structure that invokes our operator:

```python
import sys
sys.path.append("airflow")

from airflow.models import DAG
from operators.example_operator import ExampleOperator
from airflow.utils.dates import days_ago

with DAG(dag_id = "ExampleDAG", start_date=days_ago(2), schedule_interval="@daily") as dag:
		route = "my_custom_route"
    params = {
        "name": "arthur"
    }
    
    ExampleOperator(query=query, query_params=query_params, task_id="test_run")
```

It's a straightforward process. We just need to focus on the parameters of our DAG:

* **`dag_id`**: The name of the DAG.
* **`start_date`**: The point in time from which Airflow should begin running the DAG.
* **`schedule_interval`**: The time interval between each run (can be specified using a cron expression).
* **`task_id`**: The name of the task within the DAG.

With these parameters in mind, we can restart Airflow, locate our DAG in the list of available DAGs on the home page, and enable it:

![Switch Button to enable the DAG and to enable the auto-refresh](assets/img/how-to-create-your-first-etl-in-apache-airflow-04.png "Switch Button to enable the DAG and to enable the auto-refresh")

As a result of our defined **`start_date`** and **`schedule_interval`**, we will observe two runs in Airflow: one for each interval.

If all components function correctly, we will notice two new records in our database, corresponding to the two task runs.

## Simplifying Our Workflow

While we developed a custom hook and operator to enhance flexibility and enable preprocessing, Airflow provides default operators that can simplify the tasks.

For example, instead of creating a custom hook, we can use the **`SimpleHttpOperator`** to extract data from an API:

```python
extract_task = SimpleHttpOperator(
    http_conn_id="api_connection_example",
    task_id="get_data",
    method="GET",
    endpoint="my_custom_route",
    response_filter=lambda response: response.json(),
    data={
        "name": "arthur"
    }
)
```

And we can also create two operators: one to create the table and another to input the data from the API:

```python
create_table = SQLExecuteQueryOperator(
    task_id="create_table",
    conn_id="postgres_default",
    sql="""
        CREATE TABLE IF NOT EXISTS example (
            name TEXT,
            qty INTEGER
        );
    """,
)

populate_table = SQLExecuteQueryOperator(
    task_id="populate_table",
    conn_id="postgres_default",
    sql="""
				INSERT INTO example (name, qty)
        VALUES (%(name)s, %(qty)s);
    """,
    parameters={
        "name": "{{ ti.xcom_pull(task_ids='get_data', key='return_value')[0]['name'] }}",
        "qty": "{{ ti.xcom_pull(task_ids='get_data', key='return_value')[0]['qty'] }}"
        }
)
```

And our DAG will look like this:

```python
import sys
sys.path.append("airflow")

from airflow.models import DAG
from airflow.utils.dates import days_ago
from airflow.providers.http.operators.http import SimpleHttpOperator
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator

with DAG(dag_id = "ExampleDAGV2", start_date=days_ago(2), schedule_interval="@daily") as dag:
		extract_task = SimpleHttpOperator(
		    http_conn_id="api_connection_example",
		    task_id="get_data",
		    method="GET",
		    endpoint="my_custom_route",
		    response_filter=lambda response: response.json()[0],
		    data={
		        "name": "arthur"
		    }
		)
    
		create_table = SQLExecuteQueryOperator(
		    task_id="create_table",
		    conn_id="postgres_default",
		    sql="""
		        CREATE TABLE IF NOT EXISTS example (
		            name TEXT,
		            qty INTEGER
		        );
		    """,
		)
		
		populate_table = SQLExecuteQueryOperator(
		    task_id="populate_table",
		    conn_id="postgres_default",
		    sql="""
						INSERT INTO example (name, qty)
		        VALUES (%(name)s, %(qty)s);
		    """,
		    parameters=extract_task.output
		)
        
    # # Define task dependencies
    extract_task >> create_table >> populate_table
```

This way, we can simplify our workflow using just one DAG. However, as we gradually increase the complexity of our workflow, we will need to create our own hooks and operators to gain more flexibility in processing the data.

## Using the TaskFlow API

Another method to streamline our workflows is by utilizing the new **TaskFlow** API in Airflow. **TaskFlow** introduces a fresh approach to writing DAGs and tasks using decorators. It simplifies the creation of numerous Python functions to manage data and facilitate data exchange between tasks.

This approach provides a more intuitive way of treating tasks and operators as regular Python functions.

Let's take a look at our example using the **TaskFlow** API:

```python
# importing necessary packages
from airflow.decorators import dag, task
from airflow.utils.dates import days_ago
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
from airflow.providers.http.operators.http import SimpleHttpOperator

# implementing the DAG
@dag(
    dag_id="taskflow_example",
    start_date=days_ago(2),
    schedule="@daily",
    catchup=False,
)
def taskflow_example():
    @task
    def treat_params(rawData):
        return rawData[0]
    
    # the dependencies are automatically set by XCom
    extract_task = SimpleHttpOperator(
		    http_conn_id="api_connection_example",
		    task_id="get_data",
		    method="GET",
		    endpoint="my_custom_route",
		    response_filter=lambda response: response.json(),
		    data={
		        "name": "arthur"
		    }
		)
    
    SQLExecuteQueryOperator(
		    task_id="create_table",
		    conn_id="postgres_default",
		    sql="""
		        CREATE TABLE IF NOT EXISTS example (
		            name TEXT,
		            qty INTEGER
		        );
		    """,
		)
    
    sql_params = treat_params(extract_task.output)
    
    SQLExecuteQueryOperator(
		    task_id="populate_table",
		    conn_id="postgres_default",
		    sql="""
						INSERT INTO example (name, qty)
		        VALUES (%(name)s, %(qty)s);
		    """,
        parameters=sql_params
    )

taskflow_example()
```

As we can see, we can easily exchange data between tasks and create any task as a Python function, making our development faster and easier. And all the dependencies of each task will be automatically inferred by Airflow.

## Conclusion

This marks my initial exploration of Airflow and how we can develop a simple yet effective ETL process. Airflow can be challenging the first time, but as you get used to it, it becomes easier to understand all the tools and how they communicate with each other.

If you have any doubts or suggestions to enhance these examples, please feel free to comment below. Until next time!