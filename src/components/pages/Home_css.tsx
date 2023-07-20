import styled from 'styled-components';

export const SMainInfo = styled.section`
	margin: 170px auto 0;
	width:1000px;
	._each{
		margin-top: 120px;
		display: flex;
		justify-content: space-between;
		i{
			margin-right: 10px;
		}
		h3{
			font-size: 40px;
		}
		figure{
			width: 500px;
			border-radius: 30px;
			overflow: hidden;
		}
		div{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			p{
				margin-top:20px;
			}
		}
	}
}`
