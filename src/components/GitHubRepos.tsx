import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Repository } from '../generated/graphql';
import 'bootstrap/dist/css/bootstrap.min.css';
const GET_REPOS = gql`
  query Repositories($username: String!, $token: String!) {
    repositories(username: $username, token: $token) {
      id
      name
      url
      owner {
        login
      }
      diskUsage
      visibility
      fileCount
      ymlFileContent
      activeWebhooks
    }
  }
`;

interface RepositoriesData {
    repositories: Repository[];
    repositoryDetails: Repository;
}

const GitHubRepos = () => {
    const [username, setUsername] = useState('aniketdhole51291');
    const [repositoryDetails, setRepositoryDetails] = useState<Repository>();
    const [loader, setLoader] = useState<Boolean>(false);

    const [token, setToken] = useState('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');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    const { refetch } = useQuery<RepositoriesData>(GET_REPOS, {
        variables: { username, token },
        skip: true,
    });

    const handleFetchRepositories = async () => {
        if (username && token) {
            try {
                setLoader(true)
                const result = await refetch({ username, token });
                if (result?.data?.repositories) {
                    setRepositories(result?.data.repositories);
                    setLoader(false)
                } else {
                    setLoader(false)
                }

            } catch (error: any) {
                setLoader(false)
                console.error('Error fetching repositories:', error.message);
            }
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Your GitHub Repositories</h2>
            <div className='row mt-5 mb-5'>
                <div className='col-5'>
                    <input type="text" className="form-control" id="username" placeholder="GitHub Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='col-5'>
                    <input type="text" className="form-control" id="Token" placeholder="GitHub Token" value={token} onChange={(e) => setToken(e.target.value)} />                    
                </div>
                <div className='col'>
                    <button className="btn btn-primary btn-block" onClick={() => handleFetchRepositories()}>{loader ? "Loading..." : "Fetch Repositories"}</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Repo name</th>
                        <th scope="col">Repo size</th>
                        <th scope="col">Repo owner</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {repositories.map((repo, index) => (
                        <tr key={repo.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{repo.name}</td>
                            <td>{repo.diskUsage}</td>
                            <td>{repo.owner?.login}</td>
                            <td><button type="button" className={"btn btn-primary"} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setRepositoryDetails(repo)}>Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Repo Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                <>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Repo Name : <b>{repositoryDetails?.name}</b> </label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Repo Size : <b>{repositoryDetails?.diskUsage}</b></label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Repo Owner: <b>{repositoryDetails?.owner?.login}</b></label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Access: <b>{repositoryDetails?.visibility}</b></label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Files: <b>{repositoryDetails?.fileCount}</b></label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Content YML: <b>{repositoryDetails?.ymlFileContent}</b></label>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label className="form-label"> Ative Webhooks: <b>{repositoryDetails?.activeWebhooks}</b></label>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHubRepos;
