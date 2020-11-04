using System.Web.Http;

namespace Mod3_AsyncAndServerCalls.Controllers
{
    public class DemoController : ApiController
    {
        //GET: /api/Demo
        public Person Get ()
        {
            return new Person() { firstName = "Christopher", lastName = "Harrison" };
}

//GET: /api/Demo/42
public string Get(int id)
{
    return "Loaded " + id.ToString();
}

//POST: /api/Demo
public Person Post(Person person)
{
    System.Threading.Thread.Sleep(2000);

    return new Person()
    {
        firstName = person.firstName,
        lastName = person.lastName + " Processed!"
        };
    }
}

public class Person
{
    public string firstName { get; set; }
    public string lastName  { get; set; }
}
}