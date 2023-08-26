using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace Zero.Pages;

public class Index_Tests : ZeroWebTestBase
{
    [Fact]
    public async Task Welcome_Page()
    {
        var response = await GetResponseAsStringAsync("/");
        response.ShouldNotBeNull();
    }
}
