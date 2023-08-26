using Xunit;
using Zero.MongoDB;

namespace Zero;

[CollectionDefinition(ZeroTestConsts.CollectionDefinitionName)]
public class ZeroDomainCollection : ZeroMongoDbCollectionFixtureBase
{
}
