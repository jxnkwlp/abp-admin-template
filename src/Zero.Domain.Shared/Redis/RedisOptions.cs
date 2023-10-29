namespace Zero.Redis;

public class RedisOptions
{
    public bool IsEnabled { get; set; }
    public string Configuration { get; set; } = null!;
    public int DefaultDatabase { get; set; }
}
