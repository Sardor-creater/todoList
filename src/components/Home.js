import logo from '../logo.svg';
const Home = () => {
        return (
            <div className='container'>
                <img src={logo} className="App-logo" alt="logo" />
                
                 <h2>About us</h2>
                 <h4>IT решения для вашего бизнеса.</h4>
                <p>Внедряем amoCRM, МойСклад
- Избавляем компании от рутины благодаря доработке CRM-систем
- Выводим активность компании в виде дашбордов Power BI</p>
            </div>
        
        )
}

export default Home;