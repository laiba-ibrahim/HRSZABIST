const express = require('express');
const cors = require('cors');
const pool =require('./db');
const e = require('express');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try {
        res.json('welcome to HR API');
    } catch (err){
        res.status(500).json({Error:err.massage});
        
    }
});

app.get('/emp',async(req,res)=>{
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({Error:err.message});
    }
});

app.get('/40', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id,e.first_name,e.last_name,l.street_address,l.city,
                l.state_province,
                l.postal_code,
                c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/41', async (req, res) => {
    try {
        const result = await pool.query(` SELECT jh.employee_id,e.first_name,e.last_name,e.email,
                e.phone_number,jh.start_date,
                jh.end_date,jh.job_id,
                jh.department_id
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});
app.get('/42', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
            jh.start_date, jh.end_date, jh.job_id, jh.department_id
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});
app.get('/43', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
            jh.start_date, jh.end_date, jh.job_id,
            d.department_name
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/44', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       d.department_name,
       l.city, l.state_province
       FROM employees e
       JOIN job_history jh ON e.employee_id = jh.employee_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/45', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       c.country_name
       FROM employees e
       JOIN job_history jh ON e.employee_id = jh.employee_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id
       JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/46', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       d.department_name
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/47', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/48', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       d.department_name,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/49', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       l.city, l.state_province,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/50', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       c.country_name,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id
       JOIN countries c ON l.country_id = c.country_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/51', async (req, res) => {
    try {
        const result = await pool.query(`SELECT r.region_name, c.country_name, l.city, l.state_province
FROM regions r JOIN countries c ON r.region_id = c.region_id
JOIN locations l ON c.country_id = l.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/52', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, r.region_name, l.city, l.state_province
FROM countries c
JOIN regions r ON c.region_id = r.region_id
JOIN locations l ON c.country_id = l.country_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/53', async (req, res) => {
    try {
        const result = await pool.query(`SELECT l.city, l.state_province, c.country_name, r.region_name
FROM locations l
JOIN countries c ON l.country_id = c.country_id
JOIN regions r ON c.region_id = r.region_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/54', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name, e.first_name, e.last_name, l.city
FROM departments d
JOIN employees e ON d.department_id = e.department_id
JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/55', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN locations l ON d.location_id = l.location_id
JOIN countries c ON l.country_id = c.country_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/56', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name,
       m.first_name AS manager_first_name, m.last_name AS manager_last_name,
       d.department_name, l.city
       FROM employees e
       LEFT JOIN employees m ON e.manager_id = m.employee_id
       JOIN departments d ON e.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/57', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city
FROM employees e
JOIN jobs j ON e.job_id = j.job_id
JOIN departments d ON e.department_id = d.department_id
JOIN locations l ON d.location_id = l.location_id;  `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/58', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name,
       j.job_title, d.department_name,
       m.first_name AS manager_first_name, m.last_name AS manager_last_name
       FROM employees e
       JOIN jobs j ON e.job_id = j.job_id
       JOIN departments d ON e.department_id = d.department_id
       LEFT JOIN employees m ON e.manager_id = m.employee_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/59', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name,
       j.job_title, d.department_name,
       m.first_name AS manager_first_name, m.last_name AS manager_last_name,
       l.city
       FROM employees e
       JOIN jobs j ON e.job_id = j.job_id
       JOIN departments d ON e.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id
       LEFT JOIN employees m ON e.manager_id = m.employee_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/60', async (req, res) => {
    try {
        const result = await pool.query(`SELECT country_name
            FROM countries
            WHERE region_id = 1;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/61', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city LIKE 'N%';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/62', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN employees m ON d.manager_id = m.employee_id
WHERE m.commission_pct > 0.15;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/63', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT j.job_title
FROM employees e
JOIN jobs j ON e.job_id = j.job_id
WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/64', async (req, res) => {
    try {
        const result = await pool.query(`SELECT l.postal_code
FROM locations l
JOIN countries c ON l.country_id = c.country_id
JOIN regions r ON c.region_id = r.region_id
WHERE r.region_name = 'Asia';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/65', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT d.department_name FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            WHERE e.commission_pct IS NOT NULL AND e.commission_pct < (
            SELECT AVG(commission_pct)
            FROM employees WHERE commission_pct IS NOT NULL);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/66', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.job_id, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.salary > (
            SELECT AVG(salary)FROM employees
            WHERE department_id = e.department_id);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/67', async (req, res) => {
    try {
        const result = await pool.query(`SELECT employee_id FROM employees WHERE department_id IS NULL;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/68', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            GROUP BY e.employee_id, e.first_name, e.last_name
            HAVING COUNT(*) > 1;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/69', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, COUNT(*) AS employee_count
            FROM employees GROUP BY department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/70', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, SUM(e.salary) AS total_salary
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            GROUP BY j.job_title;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/71', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, AVG(commission_pct) AS avg_commission
            FROM employees
            WHERE commission_pct IS NOT NULL
            GROUP BY department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/72', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, MAX(e.salary) AS max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/73', async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
    j.job_title,
    d.department_name,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    jh.start_date
    FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id
    JOIN jobs j ON jh.job_id = j.job_id
    JOIN departments d ON jh.department_id = d.department_id
    WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/74', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, l.city, COUNT(DISTINCT d.department_id) AS num_departments
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN locations l ON d.location_id = l.location_id
JOIN countries c ON l.country_id = c.country_id
GROUP BY c.country_name, l.city
HAVING COUNT(e.employee_id) >= 2;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/75', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS full_name,
       j.job_title,
       jh.start_date, jh.end_date
       FROM employees e
       JOIN job_history jh ON e.employee_id = jh.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       WHERE e.commission_pct IS NULL; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/76', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name || ' ' || e.last_name AS full_name,
       c.country_name
       FROM employees e
       JOIN departments d ON e.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id
       JOIN countries c ON l.country_id = c.country_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/77', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.salary, e.department_id
            FROM employees e WHERE e.salary IN (
            SELECT MIN(salary)
            FROM employees
            GROUP BY department_id
);

        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/78', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM employees
            WHERE salary = (
            SELECT DISTINCT salary
            FROM employees
            ORDER BY salary DESC
            OFFSET 2 ROWS FETCH NEXT 1 ROWS ONLY); `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/79', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name, e.salary
            FROM employees e
            WHERE e.salary > (SELECT AVG(salary) FROM employees)
            AND e.department_id IN (
            SELECT DISTINCT department_id FROM employees
            WHERE UPPER(first_name) LIKE '%J%' OR UPPER(last_name) LIKE '%J%');`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/80', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.employee_id, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city = 'Toronto';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/81', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, d.department_name, l.city, l.state_province
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE LOWER(e.first_name) LIKE '%z%';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
console.log(`connect Sucessfully...on PORT ${PORT}`)
});